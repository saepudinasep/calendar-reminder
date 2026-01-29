import Swal from "sweetalert2";

export const successAlert = (title) => {
  Swal.fire({
    icon: "success",
    title,
    timer: 1500,
    showConfirmButton: false,
  });
};

export const errorAlert = (message) => {
  Swal.fire({
    icon: "error",
    title: "Oops!",
    text: message,
  });
};

export const confirmDelete = async () => {
  const result = await Swal.fire({
    title: "Hapus jadwal?",
    text: "Data yang dihapus tidak bisa dikembalikan",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    confirmButtonText: "Ya, hapus",
    cancelButtonText: "Batal",
  });

  return result.isConfirmed;
};
