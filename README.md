# GymScript 🏋️

GymScript is a workout logging app built with Expo designed to streamline the process of tracking your gym workouts. 

It is designed for users who are used to logging workouts in basic notes apps like Apple Notes or Notion and want more powerful, intuitive features without unnecessary complexity.

---
## Demo

Check out a brief video demonstrating the current functionality of GymScript, focused on workout file management. The app allows you to easily create, update, and organize your workout files in a clean, intuitive interface designed for iOS.

Features in this demo:
- Create new workout files with a single tap
- Organize and manage workout data
- Seamless navigation between different workout files

https://github.com/user-attachments/assets/8ad98bc1-48c8-4f12-beec-b5e5d6c9ce22

---

## Getting Started

### Prerequisites

Make sure you have the following tools installed on your system:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [Yarn](https://yarnpkg.com/getting-started/install) (version 1.x)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (for running the app locally)
- [Xcode](https://developer.apple.com/xcode/) (for running the app on a physical device or simulator)

### Installation

Follow these steps to set up the project on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/gymscript.git
   cd gymscript
   ```

2. **Install dependencies:**
   Use Yarn to install the project’s dependencies:
   ```bash
   yarn install
   ```

3. **Database Setup:**
   After installing dependencies, you need to set up Prisma and migrate the database schema. Run the following commands:
    Generate the Prisma Client:
   ```bash
   npx prisma generate
   ```
   Run the database migrations:
   ```bash
    npx prisma migrate dev
   ```
This ensures your database is set up correctly and that Prisma can generate the required client for database interaction.

### Running the App

Once everything is set up, you can run the app using yarn.

- **Start the app:**
   ```bash
   yarn start
   ```
   This will open up the Expo Developer Tools, allowing you to run the app on a simulator, physical device, or web browser.

- **Run on iOS:**
   ```bash
   yarn ios
   ```

### Testing

To run the unit tests:
```bash
yarn test
```
---
### License

This project is licensed under the MIT License.
