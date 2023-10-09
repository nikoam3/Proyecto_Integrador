const urlBase = `http://ec2-18-188-254-5.us-east-2.compute.amazonaws.com/`
const token =
    /*'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjE3MCIsImZ1bGxuYW1lIjoiTmljb2xhcyBBbWF5YSIsInVzZXJfcm9sZSI6IlJPTEVfQURNSU4iLCJzdWIiOiJhbWF5YS5uaWtvQGdtYWlsLmNvbSIsImlhdCI6MTY5NTA3NjQ4OCwiaXNzIjoiaHR0cDovL2U0LW1yLmluc3RydW1lbnRzLnMzLXdlYnNpdGUudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vIiwiZXhwIjoxNjk1OTQwNDg4fQ.fE_0PEz-Zjq6eVDcnjnFaCSH49s0eA89ovZ7H0xD_G1HzsZUkasC7o3eWWbFyWnxgQBYIYiNJK-cOEg-cAJK-Q'*/
    'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjE3NyIsImZ1bGxuYW1lIjoibWlzdGVyIGluc3RydW1lbnN0IiwidXNlcl9yb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6Im1yLmluc3RydW1lbnRzQGdtYWlsLmNvbSIsImlhdCI6MTY5Njg5MjMwMSwiaXNzIjoiaHR0cDovL2U0LW1yLmluc3RydW1lbnRzLnMzLXdlYnNpdGUudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vIiwiZXhwIjoxNjk3NzU2MzAxfQ.-UbQgif2PPZTzTkntH6JIslqAcRw0PN9mFzLVX120wjaeKSJ09pIO2Dn16j5tg8cywRMktwP3_MZwVQ8WHhk8w';
    const config = {
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    },
}

export {urlBase, config}