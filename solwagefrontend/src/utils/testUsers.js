import testUsersData from "../data/testUsers.json";

export const loadTestUser = (userType) => {
  const user = testUsersData.users.find((u) => u.userType === userType);
  if (user) {
    localStorage.setItem("solwage_user", JSON.stringify(user));
    return user;
  }
  return null;
};

export const loadFreelancerTestUser = () => {
  return loadTestUser("freelancer");
};

export const loadEmployerTestUser = () => {
  return loadTestUser("employer");
};

export const clearTestUser = () => {
  localStorage.removeItem("solwage_user");
};

// Function to switch between test users (for development/testing)
export const switchToUser = (userType) => {
  const user = loadTestUser(userType);
  if (user) {
    // Reload the page to trigger auth state change
    window.location.reload();
  }
  return user;
};
