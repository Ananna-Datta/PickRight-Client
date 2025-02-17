import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
  } from "firebase/auth";
  import { createContext, useState, useEffect } from "react";
import { auth } from "../Firebase/Firebase.config";
  // import { auth } from "../Firebase/firebase.config";
  import { toast } from "react-toastify";
  import Swal from "sweetalert2";
  
  export const AuthContext = createContext(null);

  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    // Track authentication state
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        },
        (error) => {
          console.error("Error tracking auth state:", error);
          setLoading(false);
        }
      );
  
      return () => unsubscribe();
    }, []);


  
    // Function to create a new user
    const createNewUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password)
        .catch((error) => {
          console.error("Error creating user:", error.message);
          throw error;
        })
        .finally(() => setLoading(false));
    };
  
    // Function to log in a user
    const loginUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
          console.error("Error logging in:", error.message);
          throw error;
        })
        .finally(() => setLoading(false));
    };
  
    // Function to log out a user
    const logoutUser = async () => {
      setLoading(true); // Indicate loading state
    
      try {
        await signOut(auth); // Sign the user out
        toast.success("Sign-out successful!"); // Show success message
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Logout successfully!",
              text: "Log Out",
              icon: "success"
            });
          }
        });
      } catch (error) {
        console.error("Error logging out:", error.message); // Log error for debugging
        toast.error("Failed to log out. Please try again."); // Show error message
        Swal.fire({
          title: 'Success!',
          text: 'Logout successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
      });
      } finally {
        setLoading(false); // Reset loading state
      }
    };
    
  
    // Context value
    const AuthInfo = {
      user,
      loading,
      loginUser,
      createNewUser,
      logoutUser,
      setLoading,
      setUser,
    };
  
    return (
      <AuthContext.Provider value={AuthInfo}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthProvider;