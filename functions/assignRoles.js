export default function assignRoles(user, roles) {
	const array = []

	if (Object.keys(roles).length === 0) {
		throw new Error('No roles provided')
	}

	const role = user.role
	const self = user.self

	if (self) {
		const selfPrivileges = roles.self
		array.push(...selfPrivileges)
	}

	switch (role) {
		case 'super-admin':
			const superAdminPrivileges = roles.superAdmin
			array.push(...superAdminPrivileges)
			break
		case 'admin':
			const adminPrivileges = roles.admin
			array.push(...adminPrivileges)
			break
		case 'user':
			const userPrivileges = roles.user
			array.push(...userPrivileges)
			break
		default:
			console.log('Invalid role')
	}

	const privileges = [...new Set(array)]

	return privileges
}
