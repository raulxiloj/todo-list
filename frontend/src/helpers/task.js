export const getInitialState = (tag) => {
    return {
        description: '', 
        tags: tag ? [tag] : null, 
        status: false
      }
}