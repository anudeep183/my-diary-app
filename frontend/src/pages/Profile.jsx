import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import UpdateModal from "../components/UpdateModal";

const Profile = () => {

  const { authUser, changePassword, deactivateAccount, isUpdating } = useAuthStore();

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [deactivatePassword, setDeactivatePassword] = useState("");
  
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }

    const success = await changePassword({
      currentPassword,
      newPassword
    });

    if (success) {
      setShowPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }
  };

  const handleDeactivateAccount = async () => {
    if (!deactivatePassword) {
      toast.error("Password is required");
      return;
    }

    const success = await deactivateAccount({ password: deactivatePassword });

    if (success) {
      setShowDeactivateModal(false);
      setDeactivatePassword("");
    }
  };

  const passwordFields = [
    {
      label: "Current Password",
      type: "password",
      value: currentPassword,
      onChange: setCurrentPassword,
      placeholder: "Enter current password"
    },
    {
      label: "New Password",
      type: "password",
      value: newPassword,
      onChange: setNewPassword,
      placeholder: "Enter new password"
    },
    {
      label: "Confirm New Password",
      type: "password",
      value: confirmNewPassword,
      onChange: setConfirmNewPassword,
      placeholder: "Re-enter new password"
    }
  ];

  const deactivateFields = [
    {
      label: "Password",
      type: "password",
      value: deactivatePassword,
      onChange: setDeactivatePassword,
      placeholder: "Enter your password"
    }
  ];

  return (
    <div className="px-6 py-12 max-w-3xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-8">Profile</h1>

      {/* Email - Read Only */}
      <div className="mb-6">
        <label className="text-sm mb-2 block opacity-80">Email</label>
        <input
          value={authUser.email}
          disabled
          className="w-full py-3 border rounded-lg px-4 bg-[#1a1a1a] opacity-60 cursor-not-allowed"
        />
      </div>

      {/* Password - Read Only */}
      <div className="mb-4">
        <label className="text-sm mb-2 block opacity-80">Password</label>
        <div className="relative">
          <input
            type="password"
            value="********"
            disabled
            className="w-full py-3 border rounded-lg px-4 bg-[#1a1a1a] opacity-60 cursor-not-allowed"
          />

          <button
            onClick={() => setShowPasswordModal(true)}
            className="absolute inset-y-0 right-3 my-auto text-blue-400 hover:text-blue-300 text-sm underline"
          >
            Change
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="my-10 border-t border-gray-700"></div>

      {/* Deactivate Section */}
      <h2 className="text-2xl font-semibold">Deactivate Account</h2>
      <p className="text-sm opacity-60 mt-1">
        This will permanently delete your account.
      </p>

      <button
        onClick={() => setShowDeactivateModal(true)}
        className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition"
      >
        Deactivate
      </button>

      {/* Change Password Modal */}
      <UpdateModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Change Password"
        fields={passwordFields}
        buttonText="Save Changes"
        buttonColor="blue"
        onSubmit={handleChangePassword}
        isLoading={isUpdating}
      />

      {/* Deactivate Account Modal */}
      <UpdateModal
        isOpen={showDeactivateModal}
        onClose={() => setShowDeactivateModal(false)}
        title="Deactivate Account"
        fields={deactivateFields}
        buttonText="Confirm Deletion"
        buttonColor="red"
        onSubmit={handleDeactivateAccount}
        isLoading={isUpdating}
      />
    </div>
  );
};

export default Profile;