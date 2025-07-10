import EditProfileForm from "@/components/general/edit-profile-form";
import ReturnButton from "@/components/general/return-button";

export default function Page() {
  return (
    <div className="flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <ReturnButton href="/profile" label="Profile" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Edit Profile
        </h1>
        <EditProfileForm />
      </div>
    </div>
  );
}