export default function Comment(comment) {

  const hasNestedComments = comment.comments.length > 0;

	return `
	<div class= "nested-comments-${comment.level}"
	<p class="comment-header>
	${comment.user} | ${comment.time_ago}
	</p>
	${comment.content}
	${hasNestedComments ? comment.comments.map(comment => Comment(comment)).join("") : ""}
	</div>
	`
}

//# In order to display sub-comments, Reid used recursion by calling Comment(comment) if there was indeed an array of nested comments in the original comment object 