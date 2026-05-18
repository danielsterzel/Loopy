# Project Overview

Loopy is a full-stack application integrated with the Spotify Web API that allows users to seamlessly loop selected intervals of songs in real time.  
The project was designed with scalability, maintainability, and responsive user experience in mind, while following Spotify Web API guidelines and modern cloud-native development practices.

# Architecture

The application follows a layered full-stack architecture consisting of:

- React frontend responsible for user interaction, playback synchronization, and UI state management
- Spring Boot backend exposing REST APIs and handling Spotify integration logic
- PostgreSQL database for persistent data storage
- OAuth2 authentication flow for secure Spotify account integration
- Containerized services orchestrated using Kubernetes

Frontend and backend communicate through REST APIs, while backend services integrate with external Spotify APIs through dedicated client abstractions.

# Tech Stack

## Frontend
- React
- TypeScript
- Vite
- Context API
- Custom Hooks

## Backend
- Java
- Spring Boot
- REST APIs
- OAuth2
- Docker
- Kubernetes

## Database
- PostgreSQL 15

# Features

- Spotify OAuth2 authentication
- Real-time playback synchronization
- Song interval looping
- Responsive and modern UI
- Token lifecycle management with automatic refresh handling
- REST-based communication between frontend and backend
- Containerized cloud-native architecture

# System Design & Engineering Decisions

The project was designed with separation of concerns and scalability in mind.

Key engineering decisions included:
- Layered backend architecture separating controllers, services, DTOs, and domain logic
- Thread-safe token lifecycle management to support concurrent requests reliably
- Context API and custom hooks for centralized frontend state management
- Service abstractions and interceptors for external Spotify API communication
- Docker-based containerization for consistent local and deployment environments
- Kubernetes orchestration enabling scalable service management and infrastructure isolation

# Deployment

The application was deployed locally using Kubernetes with Minikube.

Deployment architecture included:
- Frontend deployment
- Backend deployment
- PostgreSQL StatefulSet
- Kubernetes Services enabling communication between containers
- Docker containerization for all application components
