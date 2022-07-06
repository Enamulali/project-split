import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  Timestamp,
  FieldValue,
} from "firebase/firestore";
import { auth, db } from "../../firebase-config";

export const getUserDataById = (uid) => {
  const userRef = doc(db, "users", uid);

  return getDoc(userRef).then((userData) => {
    if (userData.data()) {
      return userData.data();
    }
    return Promise.reject(new Error("user not found"));
  });
};

export const getHouseholdbyUser = (uid) => {
  return getUserDataById(uid)
    .then((userData) => {
      const householdID = userData.household_id;
      return getDoc(doc(db, "households", householdID));
    })
    .then((householdData) => {
      if (householdData.data()) {
        return householdData.data();
      }
      return Promise.reject(new Error("data not found"));
    });
};

export const postHousehold = (userId, householdName) => {
  const userRef = doc(db, "users", userId);
  const newHouseholdRef = addDoc(collection(db, "households"), {
    household_name: householdName,
  });

  return newHouseholdRef.then((household) => {
    if (userId) {
      return updateDoc(userRef, { household_id: household.id });
    }
    return Promise.reject(new Error("no logged in user"));
  });
};

export const patchUserWithHouseholdId = (userId, householdId) => {
  const userRef = doc(db, "users", userId);
  const householdRef = doc(db, "households", householdId);

  return getDoc(householdRef).then((householdSnap) => {
    if (userId && householdSnap.exists()) {
      return updateDoc(userRef, { household_id: householdId });
    }
    return Promise.reject(new Error("no logged in user"));
  });
};

export const postAuthUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const getChoresByHouseholdId = (currentUser) => {
  const userId = currentUser ? currentUser.uid : null;

  return getUserDataById(userId)
    .then((userData) => {
      const householdId = userData.household_id;
      const q = query(
        collection(db, "chores"),
        where("household_id", "==", householdId)
      );
      return getDocs(q);
    })
    .then((chores) => {
      const choresArray = [];

      chores.forEach((chore) => {
        choresArray.push({ chore_id: chore.id, ...chore.data() });
      });
      return choresArray;
    });
};

export const postChore = (
  userId,
  { choreName, choreDescription, difficulty, day, month, clickedUser }
) => {
  console.log(clickedUser);
  return getUserDataById(userId).then(({ household_id }) => {
    const currentYear = new Date().getFullYear();
    const dueDate = new Date(currentYear, parseInt(month) - 1, parseInt(day));
    const dueDateTimeStamp = Timestamp.fromDate(dueDate);
    addDoc(collection(db, "chores"), {
      chore_name: choreName,
      description: choreDescription,
      difficulty,
      due_date: dueDateTimeStamp,
      is_completed: false,
      created_by: userId,
      household_id,
      image_url: "",
      votes: 0,
      users_assigned: clickedUser,
    });
  });
};

export const patchChoreIsCompleted = (completedChoreId, isCompleted) => {
  const choreRef = doc(db, "chores", completedChoreId);

  return updateDoc(choreRef, {
    is_completed: !isCompleted,
  });
};

export const getUsersByHousehold = (currentUser) => {
  const userId = currentUser ? currentUser.uid : null;

  return getUserDataById(userId)
    .then((userData) => {
      const householdId = userData.household_id;
      const q = query(
        collection(db, "users"),
        where("household_id", "==", householdId)
      );
      return getDocs(q);
    })
    .then((users) => {
      const usersArray = [];

      users.forEach((user) => {
        usersArray.push(user.data());
      });

      return usersArray;
    });
};

export const getBadges = (badgeId) => {
  const badgeRef = doc(db, "badges", badgeId);

  return getDoc(badgeRef).then((badges) => {
    if (badges.data()) {
      return badges.data();
    }
    return Promise.reject(new Error("badge not found"));
  });
};

export const deleteChore = (choreId) => {
  const choreRef = doc(db, "chores", choreId);
  return deleteDoc(choreRef);
};

export const patchUserPoints = (userId, chorePoints) => {
  getUserDataById(userId).then((data) => {
    let updatePoints = data.points;
    const pointsMultiplyer = 4;
    updatePoints += chorePoints * pointsMultiplyer;

    return updateDoc(doc(db, "users", userId), {
      points: updatePoints,
    });
  });
};

export const patchChoreVotes = (chore_id) => {
  return updateDoc(doc(db, "chores", chore_id), {
    votes: 1,
  });
};

// just here to show how to use function in profile

// const [userData, setUserData] = useState({})
// const [isLoading, setIsLoading] = useState(true)

// useEffect(() => {
//   getUserDataById(db, "2aTBhAwOinU5YxpWAa0nlb48tIz2").then((result) => {
//     setUserData(result)
//     setIsLoading(false)
//   })
// }, []);
