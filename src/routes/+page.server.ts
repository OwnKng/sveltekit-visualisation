import { fetchData } from '../util/fetch'
import { countries } from '../countries'
import { fail } from '@sveltejs/kit'

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData()
		const countryName = data.get('code')

		const code = countries.find((d) => d.name === countryName)?.code
		if (!code) return fail(401, { error_message: 'We were unable to ' })

		try {
			const response = await fetchData(code)

			return {
				data: response
			}
		} catch {
			return fail(401, { error_message: 'We were unable to process this one' })
		}
	}
}
