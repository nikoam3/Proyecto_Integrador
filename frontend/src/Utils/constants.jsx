const urlBase = `http://ec2-18-188-254-5.us-east-2.compute.amazonaws.com/`
const token =
    'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjE3MCIsImZ1bGxuYW1lIjoiTmljb2xhcyBBbWF5YSIsInVzZXJfcm9sZSI6IlJPTEVfQURNSU4iLCJzdWIiOiJhbWF5YS5uaWtvQGdtYWlsLmNvbSIsImlhdCI6MTY5NTA3NjQ4OCwiaXNzIjoiaHR0cDovL2U0LW1yLmluc3RydW1lbnRzLnMzLXdlYnNpdGUudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vIiwiZXhwIjoxNjk1OTQwNDg4fQ.fE_0PEz-Zjq6eVDcnjnFaCSH49s0eA89ovZ7H0xD_G1HzsZUkasC7o3eWWbFyWnxgQBYIYiNJK-cOEg-cAJK-Q'
const config = {
    withCredentials: false,
    headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/json',
    },
}

export { urlBase, token, config }
