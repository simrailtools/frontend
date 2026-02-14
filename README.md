## SimRail Information Tools (SIT) Frontend

![Build Status](https://github.com/simrailtools/frontend/actions/workflows/check.yml/badge.svg)

The SIT frontend displays the collected information of the SIT-Backend on a website. A public instance is hosted
at https://simrail.tools. Currently implemented are:

- A map displaying live train, dispatch post and server information (https://simrail.tools/map)
- A journey view showing live detailed information about a single journey (including future and past trains). Can
  currently only be accessed by selecting a train on the map and clicking on "Journey
  Details" (https://simrail.tools/journeys/<id\>)

Planned features include:

- A nicer home page
- Journey search feature
- Vehicle composition display (including images)
- Departure Boards (preview available at https://departure-boards.sit-frontend.pages.dev/departureboard)

If you want to request a feature feel free to [open an issue](https://github.com/simrailtools/frontend/issues/new) or
contact me on Discord: `@derklaro`.

### Getting Started (Development)

Local development on the application is fairly easy.

1. Install the dependencies of this project using `pnpm install`
2. Run a local development server using `pnpm run dev`
3. To preview your changes (how they would look like in production) use `pnpm run preview`

Local services run at:

| Service        | URL                    |
|----------------|------------------------|
| Dev Server     | http://localhost:5173/ |
| Preview Server | http://localhost:4173/ |

This project uses [Biome](https://biomejs.dev) for linting. Please make sure your changes pass the lint rules using
`pnpm run lint` before opening a pull request.

### License

This project is released under the terms of the MIT license. See [license.txt](license.txt)
or https://opensource.org/licenses/MIT.
