document.addEventListener("DOMContentLoaded", () => {
    const feed = document.getElementById("blog-posts-feed");

    if (!feed || !Array.isArray(blogsData)) {
        return;
    }

    const escapeHtml = (value) => {
        const html = String(value ?? "");
        return html
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\"/g, "&quot;")
            .replace(/'/g, "&#39;");
    };

    feed.innerHTML = blogsData.map((post, index) => {
        const label = post.label || `Post ${String(index + 1).padStart(2, "0")}`;
        const metaParts = [post.date, post.readingTime ? `Reading time: ${post.readingTime}` : ""].filter(Boolean);
        const meta = metaParts.join(" · ");

        const summary = post.summary ? `<p class="feed-muted">${escapeHtml(post.summary)}</p>` : "";

        const paragraphBlocks = Array.isArray(post.paragraphs)
            ? post.paragraphs
                .filter(Boolean)
                .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
                .join("")
            : "";

        const imageBlock = post.image
            ? `
                <figure class="blog-media-figure">
                    <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.imageAlt || post.title || "Blog image")}" class="blog-media-image">
                </figure>
            `
            : "";

        const challengeBlock = post.challenge
            ? `<p><strong>Challenge:</strong> ${escapeHtml(post.challenge)}</p>`
            : "";

        const nextStepBlock = post.nextStep
            ? `<p><strong>Next step:</strong> ${escapeHtml(post.nextStep)}</p>`
            : "";

        const learningsBlock = Array.isArray(post.keyLearnings) && post.keyLearnings.length > 0
            ? `
                <div class="feed-details">
                    <p><strong>Key learnings:</strong></p>
                    <ul class="feed-key-list">
                        ${post.keyLearnings
                            .filter(Boolean)
                            .map((item) => `<li>${escapeHtml(item)}</li>`)
                            .join("")}
                    </ul>
                </div>
            `
            : "";

        return `
            <article class="bento-card feed-entry">
                <p class="card-label">${escapeHtml(label)}</p>
                <h2>${escapeHtml(post.title || "Untitled Post")}</h2>
                ${meta ? `<p class="feed-meta">${escapeHtml(meta)}</p>` : ""}
                ${summary}
                ${imageBlock}
                <div class="feed-details">
                    ${paragraphBlocks}
                    ${challengeBlock}
                    ${nextStepBlock}
                </div>
                ${learningsBlock}
            </article>
        `;
    }).join("");
});
