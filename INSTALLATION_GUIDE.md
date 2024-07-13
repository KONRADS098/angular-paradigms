# Artefacts
## Traditional Angular Application
**Description**: Implements a straightforward, imperative style of programming. Utilizes Angular's standard services and components without additional state management libraries.   

**Structure**:
- Standard Angular components, services, and modules
- State management using services and local component state

## Reactive Angular Application
**Description**: Implements a reactive style using NgRx for state management. Utilizes RxJS extensively for handling asynchronous operations.   

**Structure**:
- Angular components with NgRx selectors and effects
- State management using actions, reducers, and selectors

# Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/KONRADS098/angular-paradigms.git
   ```
2. Navigate to the desired project folder (e.g., `traditional-angular` or `reactive-angular`):
   ```bash
   cd reactive-angular
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the application:
   ```bash
   ng serve
   ```