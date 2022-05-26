const filterTags = ["All", "Intelligence", "Social Skills", "Strength"];

function getTasksCountMessage(length) {
  return length === 0
    ? "No Tasks. Great Work!!"
    : `You Have ${length} Tasks For Today. All The Best!!`;
}

export { filterTags, getTasksCountMessage };
