# From where will we get the playlist offers?

## Context and Problem Statement

The offers for the playlists will come from our backend. Will we get the offers directly with Next, or should we put them in Strapi first.

## Decision Drivers

- Simplicity of coding the solution
- Coherence of solution proposed

## Considered Options

- Using Next (without Strapi) to get offers
- Using Strapi to get offers and then in Next, getting offers from Strapi

## Decision Outcome

Using Next without Strapi

### Consequences

- Easier to implement
- Loss of ability to visualize offers in Strapi

## Pros and Cons of the Options

### Using Next to get offers from backend (without Strapi)

1. Offers are tagged (with date) by communication service
2. Strapi has the names of the tags in its database (for more flexibility for com team to change tags when they want)
3. Build is triggered whenever there is a change in strapi dashboard
4. Next get offers in backend with tags from strapi

- Good, because more simple (removing Strapi from playlist generation)
- Bad, because it would have been nice to see offers in Strapi as a way of making sure things are working.

### Using Strapi to get offers from backend (then, in Next, getting offers from Strapi)

1. Offers are tagged (with date) by communication service
2. Build is triggered whenever there is a change in strapi dashboard
3. (In CI) On build, strapi uses the names it has in its database to get offers in backend
4. (In CI) Next gets offers from strapi on build

- Good, because allows visualization of offers of playlists in strapi
- Bad, adds complexity (we need to insert data in the strapi database and then retrieve it later)
