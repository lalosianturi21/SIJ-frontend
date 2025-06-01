import React, { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfilePicture } from "../../services/index/users";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducers";
import { toast } from "react-hot-toast";

const CropEasy = ({ photo, setOpenCrop }) => {
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token, formData }) => {
      return updateProfilePicture({ token, formData });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      setOpenCrop(false);
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile photo updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropImage = async () => {
    try {
      const croppedImg = await getCroppedImg(photo?.url, croppedAreaPixels);
      const file = new File([croppedImg.file], `${photo?.file?.name}`, {
        type: photo?.file?.type,
      });

      const formData = new FormData();
      formData.append("profilePicture", file);

      mutate({ token: userState.userInfo.token, formData });
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black/60 flex items-center justify-center p-4 overflow-auto">
      <div className="bg-white w-full max-w-md sm:rounded-xl shadow-xl p-6 space-y-4 animate-fade-in">
        <h2 className="text-lg font-semibold text-gray-800">Crop Image</h2>

        <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-300 shadow-inner">
          <Cropper
            image={photo?.url}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onZoomChange={(value) => setZoom(Number(value))}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
          />
        </div>

        <div>
          <label
            htmlFor="zoomRange"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Zoom: {Math.round(zoom * 100)}%
          </label>
          <input
            id="zoomRange"
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
            className="w-full h-2 rounded-lg bg-gray-200 appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            disabled={isLoading}
            onClick={() => setOpenCrop(false)}
            className="px-4 py-2 text-sm bg-red-500 text-white border border-red-600 rounded-md hover:bg-red-500 disabled:opacity-60 transition"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={handleCropImage}
            className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-700 disabled:opacity-60 transition"
          >
            {isLoading ? "Uploading..." : "Crop & Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropEasy;
