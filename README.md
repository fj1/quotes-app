based on https://geshan.com.np/blog/2021/10/nodejs-sqlite/

start BE with `node index.js` in the server directory, then visit http://localhost:3000/quotes

---

npm init
npm i sqlite3

create DB and add some quotes:

sqlite3 quotes.db

CREATE TABLE quote (
id INTEGER PRIMARY KEY AUTOINCREMENT,
quote text NOT NULL UNIQUE,
author text NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO quote (quote, author) VALUES
('Dwell on the beauty of life. Watch the stars, and see yourself running with them.', 'Marcus Aurelius'),
('Be thankful for what you have; you''ll end up having more. If you concentrate on what you don''t have, you will never, ever have enough.', 'Oprah Winfrey'),
('The only time you fail is when you fall down and stay down.', 'Stephen Richards'),
('It will never rain roses: when we want to have more roses, we must plant more roses.', 'George Eliot'),
('The true measure of success is how many times you can bounce back from failure.', 'Stephen Richards'),
('Don''t count the days, make the days count.', 'Muhammad Ali'),
('Real change, enduring change, happens one step at a time.', 'Ruth Bader Ginsburg'),
('And now that you don’t have to be perfect, you can be good.', 'John Steinbeck'),
('The most important step a man can take. It''s not the first one, is it? It''s the next one. Always the next step.', 'Brandon Sanderson'),
('Never confuse a single defeat with a final defeat.', 'F. Scott Fitzgerald'),
('A dead end street is a good place to turn around.', 'Naomi Judd'),
('Life can only be understood backward, but it must be lived forwards.', 'Søren Kierkegaard'),
('Rivers know this: There is no hurry. We shall get there some day.', 'A.A. Milne');

select \* from quote;

install “express” and “better-sqlite3” NPM packages

npm i express better-sqlite3

create index.js, which is our server

create routes/quotes.js

create the quotes service at /services/quotes.js

create /services/db.js

create config.js

in the terminal, run `node index.js` and visit http://localhost:3000/quotes

you'll see a list of quotes because the GET request fetched the data from the quotes.db SQLite DB

you can also visit http://localhost:3000/quotes?page=2

and http://localhost:3000/quotes?page=3 will have an empty array for `data`

---

Adding POST requests

need to configure Express so that it will allow JSON in the body of a req
update index.js to include `app.use(express.json());`

update /routes/quotes.js to include a POST route

update /services/quotes.js to include create() and validateCreate()

update /services/db.js to include run()

can run a cURL command in the terminal to test the POST:
(note that we need `'\''` to escape the `'`)

```
curl -i -X POST -H 'Accept: application/json' \
    -H 'Content-type: application/json' http://localhost:3000/quotes \
    --data '{"quote":"You may say I'\''m a dreamer, but I'\''m not the only one. I hope someday you'\''ll join us. And the world will live as one.","author":"John Lennon"}'
```

---

To view the DB in VS Code with the SQLite extension:

In the Explorer sidebar, there is a SQLite Explorer section (it might be collapsed).
Open that section
Open quotes.db
Right click on 'quote' and select 'Show Table' (or click the triangle next to 'quote)

---

add PUT (update)

added a test quote that we'll update

```
curl -i -X POST -H 'Accept: application/json' \
    -H 'Content-type: application/json' http://localhost:3000/quotes \
    --data '{"quote":"update me! my ID is","author":"anonymous"}'
```

checked the DB, and this quote's ID is 15
so we'll request an update that changes the description

update services/quotes.js to add a PUT
update routes/quotes.js to handle `router.put()`

```
curl -i -X PUT -H 'Accept: application/json' \
    -H 'Content-type: application/json' http://localhost:3000/quotes/15 \
    --data '{"quote":"update me! my ID is 15","author":"anonymous"}'
```

---

add DELETE

update services/quotes.js to add deleteQuote
update routes/quotes.js to handle `router.delete()`

add a test quote to delete:

```
curl -i -X POST -H 'Accept: application/json' \
    -H 'Content-type: application/json' http://localhost:3000/quotes \
    --data '{"quote":"delete me! my ID is 16","author":"anonymous"}'
```

delete the quote with the id of 16

```
curl -i -X DELETE -H 'Accept: application/json' \
    -H 'Content-type: application/json' http://localhost:3000/quotes/16
```

---

prep for adding UI
move all files except .gitignore and the README to a new directory, /server

---

in root dir, ran `npx create-react-app client`

in quote-app/client, run `npm start` and visit http://localhost:3000/

updated package.json at root level to use concurrently for installing and starting the backend and client at the same time
in root dir, `npm i concurrently` https://www.npmjs.com/package/concurrently

update server port to use 3001 (because client is using 3000)

update server package.json to have a `start` script

run `npm start` at root level, looking good so far 🎉
