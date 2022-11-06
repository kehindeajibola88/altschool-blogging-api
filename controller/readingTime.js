exports.calculateReadTime = (body) => {
    if (!body) {
        throw new Error("body must nit be empty")

    }

    const wordCount = body.split(" ").length
    const readTime = Math.round(wordCount / 200)
    if ( readTime < 1 ) {
        return "less than a min"
    } else {
        return ` ${readTime} mins `
    }
}