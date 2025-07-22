# Bidding System

Initial setup for node and npm:
```bash
nvm install
npm install
```

Run with the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Monitoring

The development server logs api and page loads to the terminal it is running from.
The current implementation doesn't allow for much other monitoring, for example browsing the data. One option is to use PostMan or other web tools to check the raw api return values. Additional monitoring could be implemented with logging. A full migration to an actual database would allow for more options but was too complicated for the time available.

## Scalability and Performance

The data is currently simply in memory on the web app. For a small deployment this is quite sufficient performance-wise. A database like PostGres or similar would perform better at larger scale. Many of the algorithms could be improved with additional caching or more advanced data structures, for example a cache storing copies of bids separated by collection.

On the front end the application displays all collections and all bids with no paging, implementing that would be a significant improvement at the expense of additional complications. Additional api capabilities to fetch only the bids associated with a given collection could also allow for improvements. Additionally the application reloads when the data is changed, a significant rendering bottleneck. This could be addressed by optimizing state transitions and component dependencies.

## Tradeoffs

The primary tradeoff was simplifying things so that I was able to implement the requested functionality in time. While I was able to quickly catch up on react and Next the front end state reloads significantly with almost every change. Since the formatting is quite simple this does happen quickly on modern browsers but could still be improved. That would probably be the first thing I would address. I might also take the opportunity to learn more about database integration and set up a postgres or other database. A user login system could also be fun to integrate. On the front end a more elaborate component structure would make the system easier to extend. Of course tweaking the layout and experimenting with different ui libs is always interesting as well.

