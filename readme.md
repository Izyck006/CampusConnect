\# Campus Connect: Group 7 BUK

Campus Connect is a real-time, collaborative campus utility platform built for Bayero University Kano. It features real-time messaging, smart scheduling, and emergency management.

\#\# 🛠 Setup Instructions

\#\#\# Prerequisites  
\* \*\*Node.js:\*\* Ensure you have Node.js (v24+) installed.  
\* \*\*MongoDB:\*\* You will need a connection string to a MongoDB Atlas cluster.  
\* \*\*Expo Go:\*\* Download the "Expo Go" app on your mobile device for testing.

\#\#\# 1\. Environment Configuration  
Navigate to the \`campus-connect-backend\` folder and create a .env file:

Bash  
cd campus-connect-backend  
touch .env

### **Backend Setup**

Bash  
\# Install dependencies  
npm install

\# Start the server  
node server.js

### **Mobile App Setup**

Navigate to the root project directory:

Bash  
\# Install dependencies  
npm install

\# Start the Expo development server  
npx expo start

Scan the generated QR code using the **Expo Go** app on your Android or iOS device. 

## **Known Issues**

While Campus Connect is production-ready for demo purposes, please be aware of the following:

1. **Network Latency:** The WebSocket connection and database handshake depend on the local network stability. In areas with high firewall restrictions (e.g., restricted campus public Wi-Fi), you may experience `ETIMEDOUT` errors.  
   * *Workaround:* Use a personal mobile hotspot if network connectivity is unstable.  
2. **Keyboard Occlusion (Android):** On specific Android screen aspect ratios, the `KeyboardAvoidingView` may require manual offset adjustment.  
   * *Status:* Hardcoded to `90` for the chat screen; currently working as intended.  
3. **Authentication Persistence:** If the backend server restarts, valid JWT tokens remain on the client-side. The app performs a server-side check on navigation, but user re-authentication may be required if the `JWT_SECRET` in the `.env` file is rotated.  
4. **Native Module Limitations:** As a Managed Workflow Expo project, some specific background geolocation features are restricted until an `eas build` is triggered to compile the native Android/iOS binaries.

## **Tech Stack**

* **Frontend:** React Native, Expo, TypeScript, Ionicons  
* **Backend:** Node.js, Express, Socket.io (WebSockets)  
* **Database:** MongoDB, Mongoose  
* **Auth:** JSON Web Tokens (JWT), bcryptjs

