import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateEmail,
  updatePassword,
  updateProfile,
  reload,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPhotoUrl, setUserPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const signup = async (email, password, name, photo) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, {
        name,
        email,
        photoURL: user.photoURL,
        isAdmin: false,
      });
      toast.success("Account created!");

      await setDisplayNameAndPhoto(name, photo);

      await reloadUser();
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("Email already in use.");
      }
      setTimeout(() => {
        document.location.reload();
      }, 4000);
    }
  };

  const login = async (email, password) => {
     return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const reloadUser = async () => {
    await auth.currentUser.reload();
    setCurrentUser(auth.currentUser);
    setUserName(auth.currentUser.displayName);
    setUserEmail(auth.currentUser.email);
    setUserPhotoUrl(auth.currentUser.photoURL);
    return true;
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const setEmail = (email) => {
    return updateEmail(currentUser, email);
  };

  const setPassword = (newPassword) => {
    return updatePassword(currentUser, newPassword);
  };

  const setDisplayNameAndPhoto = async (displayName, photo) => {
    let photoURL = auth.currentUser.photoURL;

    if (photo) {
      const fileRef = ref(
        storage,
        `profile_photos/${auth.currentUser.email}/${photo.name}`
      );

      const uploadResult = await uploadBytes(fileRef, photo);

      photoURL = await getDownloadURL(uploadResult.ref);

      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        photoURL: photoURL,
      });
    }

    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
        const role = userData ? userData.isAdmin : false;
        setIsAdmin(role);
        setUserName(user?.displayName);
        setUserEmail(user?.email);
        setUserPhotoUrl(user?.photoURL);
        setCurrentUser(user);
        setLoading(false);
      } else {
        setIsAdmin(false);
        setUserName(user?.displayName);
        setUserEmail(user?.email);
        setUserPhotoUrl(user?.photoURL);
        setCurrentUser(user);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const contextValues = {
    currentUser,
    signup,
    login,
    logout,
    reloadUser,
    resetPassword,
    setDisplayNameAndPhoto,
    setEmail,
    setPassword,
    userName,
    userEmail,
    userPhotoUrl,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {loading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider as default, useAuthContext };
