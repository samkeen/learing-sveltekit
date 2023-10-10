/**
 * 
 * This page accepts a form POST to add a new link or to remove an existing link
 * It also fetches all un-archived links and returns them to the page 
 */

/** @type {import('./$types').PageServerLoad} */
// https://kit.svelte.dev/docs/form-actions
export async function load({ cookies }) {
	// get the list of un-archived links
	const res = await fetch(`http://0.0.0.0:8000/links/`);
	const item = await res.json();
    console.log(`GET links response: ${item.links}`);
	return { item };
}


/** @type {import('./$types').Actions} */
export const actions = {
	addLink: async ({ cookies, request }) => {
		const data = await request.formData();
		const link = data.get('link');
		console.log(`recived link: ${link}`);
		const post_link = {
			"id": "999",
			"title": "Link title",
			"url": link
		  }
		// add the link to the database
		const response = await fetch(`http://0.0.0.0:8000/links/`, {
				method: 'POST',
				body: JSON.stringify(post_link),
				headers: {
					'Content-Type': 'application/json'
				}
			});
		// 1. @TODO Catch error here (unparsible JSON)
		// 2. @TODO Fix API to still send back JSON when error ("Exception: Multiple links found with id 999")
		// 3. @TODO Need to alter API to generate the id
		// 	
		const result = await response.json();
		console.log(`POST links response: ${result}`);

		return { success: true };
	},
	removeLink: async (event) => {
		// TODO register the user
	}
};



// https://kit.svelte.dev/docs/load#making-fetch-requests
// export async function load({ fetch, params }) {
// 	const res = await fetch(`http://0.0.0.0:8000/links/`);
// 	const item = await res.json();
//     console.log(item.links);
// 	// this will be available as the data variable in +page.svelte in this directory
// 	return { item };
// }