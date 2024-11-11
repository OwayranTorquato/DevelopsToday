# Vehicle Filter

This project allows filtering vehicle models based on year and make. It uses the public NHTSA API to fetch vehicle data and display the results on the interface.

### Features

- Filter by Year and Make: The user can select the vehicle year and make to view the available models.
- Dynamic Results Display: The results are dynamically loaded via API based on the user's selections.
- Simple Interface: The interface is designed to be simple and functional, using React and Next.js.

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/seu-usuario/vehicle-filter.git

## How to run the project

- Navigate to the project folder with cd vehicle-filter
- Run npm install
- Create a .env.local file at the root of the project and add your environment variables as shown in the .env.local.example file
- Run the project: npm run dev

### Prerequisites

- Node.js (version 14 or above)
- NPM (Node package manager)

### Questions and Technical Discussions
- During the development, a question arose about using generateStaticParams and Suspense together in Next.js.

#### Explanation and Question:
- generateStaticParams is used to generate routes statically before the server runs, while Suspense is used to handle the loading of asynchronous data within components, displaying something while the data is still being loaded.
In this project, vehicle data is loaded on the client-side after navigation using useEffect. Therefore, I don’t see an immediate need to use Suspense, as the data loading can be handled simply with a "Loading..." state while the API response is being fetched.
I would like to discuss this further with the team to better understand the reason for using these two features together, in case there is an advantage or better approach that I haven’t fully understood. I am eager to learn and apply the solution effectively.


