require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/exercises', (req, res, next) => {
  const sql = `
    select "exerciseId",
           "name",
           "description"
      from "exercises"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/routines', (req, res, next) => {
  const sql = `
    select "routineId",
           "name",
           "description",
           "difficulty"
      from "routines"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/routines/:routineId', (req, res, next) => {
  const routineId = parseInt(req.params.routineId);
  const values = [routineId];
  const sql = `
    select "r"."sets",
           "r"."reps",
           "r"."routineExerciseId",
           "e"."name"
      from "routineExercises" as "r"
      join "exercises" as "e" using ("exerciseId")
     where "routineId" = $1;
  `;
  db.query(sql, values)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/exercises', (req, res, next) => {
  const values = [req.body.name, req.body.description];
  const sql = `
    insert into "exercises" ("exerciseId", "name", "description", "createdAt")
    values (default, $1, $2, default)
    returning *;
  `;
  db.query(sql, values)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/routines', (req, res, next) => {
  const values = [req.body.name, req.body.description, req.body.difficulty];
  const sql = `
    insert into "routines" ("routineId", "name", "description", "difficulty", "createdAt")
    values (default, $1, $2, $3, default)
    returning *;
  `;
  db.query(sql, values)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/routineExercises', (req, res, next) => {
  const values = [parseInt(req.body.routineId), parseInt(req.body.exerciseId), parseInt(req.body.sets), parseInt(req.body.reps)];
  const sql = `
    insert into "routineExercises" ("routineExerciseId", "routineId", "exerciseId", "sets", "reps", "createdAt")
    values (default, $1, $2, $3, $4, default)
    returning *;
  `;
  db.query(sql, values)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.put('/api/routines/:routineId', (req, res, next) => {
  const values = [parseInt(req.params.routineId), req.body.name, req.body.description, req.body.difficulty];
  const sql = `
    update "routines"
      set "name"        = $2,
          "description" = $3,
          "difficulty"  = $4
     where "routineId"  = $1
    returning *;
  `;
  db.query(sql, values)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.put('/api/exercises/:exerciseId', (req, res, next) => {
  const values = [parseInt(req.params.exerciseId), req.body.name, req.body.description];
  const sql = `
    update "exercise"
      set "name"         = $2,
          "description"  = $3
     where "exerciseId"  = $1
    returning *;
  `;
  db.query(sql, values)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.put('/api/routineExercises/:routineExerciseId', (req, res, next) => {
  const values = [parseInt(req.params.routineExerciseId), parseInt(req.body.sets), parseInt(req.body.reps)];
  const sql = `
    update "routineExercises"
      set "sets"                = $2,
          "reps"                = $3
     where "routineExerciseId"  = $1
    returning *;
  `;
  db.query(sql, values)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.delete('/api/exercises/:exerciseId', (req, res, next) => {
  const exerciseId = parseInt(req.params.exerciseId);
  const values = [exerciseId];
  const sql = `
    delete from "exercises"
     where "exerciseId" = $1
    returning *;
  `;
  db.query(sql, values)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.delete('/api/routines/:routineId', (req, res, next) => {
  const routineId = parseInt(req.params.routineId);
  const values = [routineId];
  const sql = `
    delete from "routines"
     where "routineId" = $1
    returning *;
  `;
  db.query(sql, values)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.delete('/api/routineExercises/:routineExerciseId', (req, res, next) => {
  const values = [parseInt(req.params.routineExerciseId)];
  const sql = `
    delete from "routineExercises"
     where "routineExerciseId" = $1
    returning *;
  `;
  db.query(sql, values)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${process.env.PORT}`);
});
