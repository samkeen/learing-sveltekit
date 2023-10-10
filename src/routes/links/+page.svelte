<script>
	/**
  This page is a form to add new links to the database
  This also displays all the links in the database which are not archived
  */
	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<h1>Links</h1>

// add a new link
<form method="POST" action="?/addLink">
	<label>
		Link
		<input name="link" type="text" />
	</label>
	<button>Add link</button>
</form>

{#if form?.success}
	<!-- this message is ephemeral; it exists because the page was rendered in
		   response to a form submission. it will vanish if the user reloads -->
	<p>Link added!</p> 
{/if}

<p>List of links</p>
{#each data.item.links as link}
  <h2>{link.id}</h2>
  <p>{link.url}</p>
{/each}
