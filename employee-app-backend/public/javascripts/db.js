const Pool = require('pg').Pool

const getPool = () => {return new Pool({
  user: 'appperfect',
  host: 'localhost',
  database: 'appperfect',
  password: 'codeknight@03',
  port: 5432,
})
}


module.exports = getPool;