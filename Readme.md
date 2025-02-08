# Project Name

> This project can be handling fitur comment user using react for frontend and backend using .net. For example:  
> This project consists of a backend API (`CommentApi`) and a frontend application (`FE_TEST`). It uses Docker for database management and provides a simple CLI via `makefile` to streamline development tasks.
> And Link i prompt to chatgpt on the CommentApi/Docs

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [CLI Commands](#cli-commands)
4. [Usage](#usage)

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [.NET SDK](https://dotnet.microsoft.com/download) (for running the backend API)
- [Node.js](https://nodejs.org/) (for running the frontend application)
- [Docker](https://www.docker.com/) (for managing the database)
- [Bun](https://bun.sh/) (optional, for running the frontend with Bun)
- [Make](https://www.gnu.org/software/make/) (for using the provided CLI commands)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/wafi04/intern.git
   cd intern
   ```
2. Install dependencies:
   For the backend (CommentApi):

   ```bash
   cd CommentApi
   dotnet restore
   ```

3. For the frontend (FE_TEST):

   ```bash
    cd FE_TEST
   bun install
   ```

4. Setup Database :

   ```bash
   make up
   ```

## Running Project

To run the project, follow these steps:

1.  Start the Database :
    Open a terminal and run:
    ```bash
    make up
    ```
2.  Start the Backend:
    Open a new terminal pane or window and run:
    ```bash
    make run-be
    ```
3.  Start the Frontend:
    Open another terminal pane or window and run:

    ```bash
    make run-fe
    ```

    You can split your terminal into three panes (e.g., using tools like tmux, screen, or IDE terminals) to run all three commands simultaneously:

    - Pane 1: Run the database (make up)
    - Pane 2: Run the backend (make run-be)
    - Pane 3: Run the frontend (make run-fe)

## Folder Structure

    .
    ├── CommentApi/ # Backend API built with .NET
    │ ├── Controllers/ # API controllers
    │ ├── Models/ # Data models
    │ ├── Docs/chatgpt/link.txt  # documentation prompt to chatgpt
    │ ├── Services/ # Business logic and services
    │ ├── Migrations/ # Database migrations
    │ ├── docker-compose-db.yml # Docker configuration for the database
    │ └── Program.cs # Entry point for the backend application
    ├── FE_TEST/ # Frontend application
    │ ├── src/ # Frontend source code
    │ ├── package.json # Frontend dependencies
    │ └── bun.lockb # Bun lockfile
    ├── makefile # CLI commands for managing the project
    └── README.md # This file
