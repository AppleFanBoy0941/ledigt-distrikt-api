import express from 'express'
import './database.js'
import users from './routes/users/index.js'
import auth from './routes/auth/index.js'
import cors from 'cors'
import reports from './routes/reports/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.listen(5500, () => {
	console.log('Running on port 5500')
})

app
	.route('/')
	.all((request, response) =>
		response
			.status(200)
			.send({ message: "Hej, velkommen til Ledigt Distrikt Dovre 2023-api'et. Håber det fungerer godt for dig" })
	)

users(app)
auth(app)
reports(app)

export default app
