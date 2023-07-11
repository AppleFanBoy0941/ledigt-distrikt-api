import isEmpty from '../../functions/isEmpty.js'
import User from '../../models/user.model.js'
import roleValidator from '../../functions/roleValidator.js'
import defaultError from '../../functions/defaultError.js'

export default async function createUser(request, response) {
	if (isEmpty(request.body)) {
		response.status(400).send({ success: false, message: 'Mangler information' }).end()

		return
	}

	const creator = await User.findById(request.userid)

	if (!creator) {
		response.status(403).send({ success: false, message: 'Ugyldig bruger, hent et nyt token og prøv igen' }).end()
		return
	}

	if (!roleValidator(creator.role, ['super-admin'])) {
		response
			.status(403)
			.send({ success: false, message: 'Ugyldig bruger, kun brugere med rollen "super-admin" kan oprette nye brugere' })
			.end()
		return
	}

	const user = await User.findOne({ username: request.body.username })

	if (user) {
		response.status(403).send({ success: false, message: 'Username already exist' }).end()
		return
	}

	const verbs = [
		'Dansende',
		'Opmuntrende',
		'Trostyrkende',
		'Milde',
		'Ydmyge',
		'Ivrige',
		'Gudfrygtige',
		'Gavmilde',
		'Fredsstiftende',
	]

	const nouns = [
		'Missekat',
		'Kattekilling',
		'Hest',
		'Kalkun',
		'Autocamper',
		'Hundehvalp',
		'Tulipan',
		'Muh-ko',
		'Plante',
		'Stavblender',
		'Stegepande',
	]

	const password =
		'Den' +
		verbs[Math.floor(Math.random() * verbs.length)] +
		nouns[Math.floor(Math.random() * nouns.length)] +
		Math.floor(Math.random() * 100)

	try {
		const user = await User.create({
			password,
			username: request.body.username || `${request.body.first_name}${request.body.last_name.split('')[0]}`,
			...request.body,
		})

		await user.save()

		console.log(user)

		response.status(201).send({ success: true, message: 'User created', user: user }).end()
	} catch (error) {
		defaultError(response, error)
	}
}
