API Documentation
Overview
Welcome to the CRIMS. This API enables developers to manage user accounts with authentication and role-based access.
Base URL
https://api.example.com/api/v1
Features
•	Create, read, update, and delete crimes and resources
•	Secure authentication via API keys
•	Rate limiting for fair usage
•	Error handling and validation
Authentication
This API requires authentication via an API key.
How to Authenticate
1.	Sign up and get your API key from the API Dashboard.
2.	Include the API key in the request headers:
Authorization: Bearer YOUR_API_KEY
Alternatively, you can pass the API key as a query parameter:
https://api.example.com/api/v1/users?api_key=YOUR_API_KEY
 Note: Always keep your API key secure and avoid exposing it in public repositories.
Endpoints
1. Get All Crimes
Retrieves a list of crimes.
Request:
GET /crimes
Headers:
Authorization: Bearer YOUR_API_KEY
Response:
{
  "crime": [
    { "id": 10000, "categories": "Property", "types": "Theft", “locations”: “Mercado”, “status”: “Pending” },
    { "id": 20000, "categories": "People", "types": "Murder", “locations”: “Isok I”, “status”: “Pending” }
  ]
}
Status Codes:
•	200 OK - Request successful
•	401 Unauthorized - Invalid API Key
2. Get All Resources
Retrieves a list of resources.
Request:
GET /resources
Headers:
Authorization: Bearer YOUR_API_KEY
Response:
{
  "    HumanResources: {
": [    { "id": 1, "name": "Willdel Bravo", "equipment": "M15, Butterfly Knife, AK-47", “position”: “Private”},
  ]
  "    TransportResources: {
": [    { "platenumber": “GGEZ10”, "typeOfVehicle": "Mobile", "fuel": "100”},
  ]
}
Status Codes:
•	200 OK - Request successful
•	401 Unauthorized - Invalid API Key

3. Get Crime by Id
Fetches details of a crime.
Request:
GET /crimes/{id}
Example Request:
GET /crimes/10000
Response:
{
  " id": 10000,
 "categories": "Property", 
"types": "Theft", 
“locations”: “Mercado”, 
“status”: “Pending” }
Status Codes:
•	200 OK - Success
•	404 Not Found - User not found
4. Get Resources by Id
Fetches details of a resource.
Request:
GET /resources/{id}
Example Request:
GET /resources/1
Response:
{
id": 1, 
"name": "Willdel Bravo", 
"equipment": "M15, Butterfly Knife, AK-47", 
“position”: “Private”}
Status Codes:
•	200 OK - Success
•	404 Not Found - User not found

5. Report a Crime
Adds a new crime to the system.
Request:
POST /crimes
Content-Type: application/json
Body:
{
  "categories": "Property",
  "types": "Theft"
   “location”: “Mercado”
}
Response:
{
  "id": 10000,
  "categories": "Property",
  "types": "Theft"
   “location”: “Mercado”
}
Status Codes:
•	200 Created - User successfully created
•	400 Bad Request - Invalid input

6. Create a Resource
Adds a new resource to the system.
Request:
POST /resources
Content-Type: application/json
Body:
{
 “name”: “Willdel Bravo”,
 "equipment": "M15, Butterfly Knife, AK-47", 
“position”: “Private”
}
Response:
{
  "id": 10000,
“name”: “Willdel Bravo”,
 " equipment": "M15, Butterfly Knife, AK-47", 
“position”: “Private”
}
Status Codes:
•	200 Created - User successfully created
•	400 Bad Request - Invalid input

7. Update a Crime
Modifies an existing crime’s details.
Request:
PUT /crimes/{id}
Body:
{
"categories": "Property", 
"types": "Theft", 
“locations”: “Mercado”, 
“status”: “Completed” }
Response:
{
  " id": 10000,
 "categories": "Property", 
"types": "Theft", 
“locations”: “Mercado”, 
“status”: “Completed” }
Status Codes:
•	200 OK - Updated successfully
•	400 Bad Request - Invalid data



8. Update a Resource
Modifies an existing resource’s details.
Request:
PUT /resources/{id}
Body:
{
“name”: “Willdel Bravo”,
 "equipment": "M15, Butterfly Knife, AK-47", 
“position”: “Major”}
Response:
{
  " id": 1,
“name”: “Willdel Bravo”,
 "equipment": "M15, Butterfly Knife, AK-47", 
“position”: “Major”}
Status Codes:
•	200 OK - Updated successfully
•	400 Bad Request - Invalid data
9. Delete a Resource
Removes a resource from the system.
Request:
DELETE /resource/{id}
Response:
{
  "message": "Resource Successfully Deleted"
}
Status Codes:
•	200 OK - User deleted
•	404 Not Found - User does not exist
Error Handling
Common Error Responses
All error messages follow this format:
{
  "error": "Error message",
  "code": 400
}
Status Code	Meaning	Description
400	Bad Request	Invalid input data
401	Unauthorized	Invalid API key
403	Forbidden	No access rights
404	Not Found	Resource not found
500	Server Error	Internal API failure

Rate Limits
This API enforces rate limits to prevent misuse.
Plan	Requests per Minute
Free Plan	100 requests
Premium	1000 requests
Exceeding the limit returns:
{
  "error": "Too many requests",
  "code": 429
}

Changelog & Versioning
Changelog
•	v1.2.0 - Added rate limits
•	v1.1.0 - Added update user endpoint
•	v1.0.0 - Initial API release
Versioning
To ensure backward compatibility, include version numbers in API requests:
https://api.example.com/api/v1/crimes
Contact & Support
For API issues, contact our support team:
•	Email: support@example.com
•	API Dashboard: https://dashboard.example.com