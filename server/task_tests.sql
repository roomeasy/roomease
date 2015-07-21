INSERT INTO dwellings (address, name) 
                     VALUES ('123 The St', 'The House');

INSERT INTO dwellings (address, name) 
                     VALUES ('233 Other St', 'The Other');

INSERT INTO tasks (name, dwelling_id, frequency, description) 
                     VALUES ('do stuff', 1, 1, 'often');

INSERT INTO tasks (name, dwelling_id, frequency, description) 
                     VALUES ('other stuff', 2, 1, 'to be done');

INSERT INTO task_instances (due_date, completed, task_id)
                     VALUES ('2015-07-15', FALSE, 1);

SELECT tasks.name, due_date
  FROM tasks, task_instances
  WHERE task_instances.task_id = tasks.id
  AND tasks.dwelling_id = 1; 