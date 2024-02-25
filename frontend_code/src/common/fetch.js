export function GET(endpoint)
{
    const fullURL = `http://127.0.0.1:5000${endpoint}`;

    return fetch(fullURL, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    });
}

export function POST(endpoint, data)
{
    const fullURL = `http://127.0.0.1:5000${endpoint}`;

    return fetch(fullURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

export function PUT(endpoint, data)
{
    const fullURL = `http://127.0.0.1:5000${endpoint}`;

    return fetch(fullURL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

export function PATCH(endpoint, data)
{
    const fullURL = `http://127.0.0.1:5000${endpoint}`;

    return fetch(fullURL, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });
}

export function DELETE(endpoint)
{
    const fullURL = `http://127.0.0.1:5000${endpoint}`;

    return fetch(fullURL, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
    });
}
