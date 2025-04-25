Property-Related Queries Examples
Basic City Search:

Query: Find me a property in Beirut
Expected Response: A list of properties in Beirut.
City and Type Search:

Query: I want an apartment in Batroun
Expected Response: A list of apartments in Batroun.
City, Type, and Price Search:

Query: Find me a house in Saida under $300,000
Expected Response: A list of houses in Saida priced under $300,000.
City and Bedroom Count Search:

Query: Show me a 3-bedroom property in Tripoli
Expected Response: A list of 3-bedroom properties in Tripoli.
Detailed Search:

Query: Find me a 4-bedroom house in Beirut with a garage and built after 2010
Expected Response: A list of 4-bedroom houses in Beirut with a garage and built after 2010.
Street-Specific Search:

Query: I want a property on Batroun Coastal Road in Batroun
Expected Response: A list of properties on Main Street in Batroun.
Size and Lot Search:

Query: Find me a property in Beirut with at least 2000 sqft and a lot size of 5000 sqft
Expected Response: A list of properties in Beirut matching the size and lot criteria.
Agent-Related Queries
Basic Agent Query:

Query: Show me agents
Expected Response: A list of agents.
Agent-Specific Query:

Query: I want to contact an agent in Beirut
Expected Response: A list of agents operating in Beirut.
Invalid or Default Queries
Unrecognized Query:

Query: Tell me about the weather
Expected Response: "I'm sorry, I didn't understand that. Can you rephrase?"
Empty Query:

Query: "" (empty message)
Expected Response: "I'm sorry, I didn't understand that. Can you rephrase?"
Edge Cases
No Matching Properties:

Query: Find me a property in a nonexistent city
Expected Response: "Sorry, no properties match your criteria."
Invalid Price Format:

Query: Find me a property under $abc
Expected Response: "Sorry, no properties match your criteria." (or handle gracefully).
Partial Filters:

Query: Find me a property with 3 bedrooms
Expected Response: A list of properties with 3 bedrooms, regardless of location.