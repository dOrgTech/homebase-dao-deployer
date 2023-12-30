# Homebase DAO Deployer

## Overview

This repository hosts the Homebase DAO Deployer, a lightweight Express server tailored for deploying and managing Decentralized Autonomous Organizations (DAOs) on the Tezos blockchain. Evolved from the original [Tezos Homebase app](https://github.com/dOrgTech/homebase-app), this server focuses on streamlined functionality and reduced redundancy.

## Key Features

- **Lightweight Deployment**: Quick and efficient deployment of DAOs.
- **Reduced Redundancy**: Removal of superfluous code from the original Homebase app.
- **Core Functionality**: Essential features for effective DAO management are maintained.

## Prerequisites

- **Node.js**: Version `v16.15.*` or newer.
- **Yarn**: Version `v1.22.*` or newer.

## Installation and Setup

1. **Clone the Repository**: 
   ```
   git clone git@github.com:dOrgTech/homebase-dao-deployer.git
   cd homebase-dao-deployer
   ```

2. **Install Dependencies**:
   ```
   yarn install
   ```

3. **Environment Setup**: 
   Create a `.env` file in the root directory and populate it with necessary environment variables as per the `.env.example` file.

4. **Build the Project**:
   ```
   yarn build
   ```

5. **Run the Server**:
   - For development:
     ```
     yarn dev
     ```
   - For production:
     ```
     yarn start
     ```

## Future Development

- **Code Refactoring**: Ongoing efforts to refactor code, incorporating learnings and best practices from the original Homebase app.
- **Feature Expansion**: Continuous development to introduce new features and enhance user experience.

### Contributing
If you're interested in contributing to the `homebase-dao-deployer`:
1. Fork the repository.
2. Create a new branch for your feature.
3. Make your changes.
4. Submit a pull request with a comprehensive description of the changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.