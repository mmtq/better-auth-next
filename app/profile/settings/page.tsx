import ChangePasswordForm from "@/components/general/change-password-form";
import ChangeProfileForm from "@/components/general/change-password-form";
import EditProfileForm from "@/components/general/edit-profile-form";
import ReturnButton from "@/components/general/return-button";

export default function Page() {
  return (
    <div className="flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <ReturnButton href="/profile" label="Profile" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Settings
        </h1>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Update your profile</h2>
          <EditProfileForm />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Change your password</h2>
          <ChangePasswordForm />
        </div>
      </div>

    </div>
  );
}