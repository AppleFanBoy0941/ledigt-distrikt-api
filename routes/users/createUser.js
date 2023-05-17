import isEmpty from '../../functions/isEmpty.js'
import User from '../../models/user.model.js'
import roleValidator from '../../functions/roleValidator.js'
import defaultError from '../../functions/defaultError.js'

export default async function createUser(request, response) {
	if (isEmpty(request.body)) {
		response.status(400).send({ message: 'Mangler information' }).end()

		return
	}

	const creator = await User.findById(request.userid)

	if (!creator) {
		response.status(403).send({ message: 'Ugyldig bruger, hent et nyt token og prøv igen' }).end()
	}

	if (!roleValidator(creator.role, ['super-admin'])) {
		response.status(403).send({ message: 'Ugyldig bruger, kun brugere med rollen "super-admin" kan oprette nye brugere' }).end()
	}

	const verbs = [
		'Dansende',
		'Opmuntrende',
		'Trostyrkende',
		'Milde',
		'Ydmyge',
		'Ivrige',
		'Tålmodige',
		'Kærlige',
		'Gudfrygtige',
		'Gavmilde',
		'Gæstfrie',
		'Hjælpsomme',
		'Fredsstiftende',
	]

	const nouns = [
		'Ælling',
		'Kattekilling',
		'Hest',
		'Kalkun',
		'Autocamper',
		'Hundehvalp',
		'Påfugl',
		'Muh-ko',
		'Plante',
		'Trillebør',
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

		response.status(201).send(user).end()
	} catch (error) {
		defaultError(response, error)
	}
}
