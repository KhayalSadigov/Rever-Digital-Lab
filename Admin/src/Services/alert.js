import Swal from "sweetalert2";

function showSuccessMessage() {
  Swal.fire({
    title: "Başarılı!",
    text: "React içinde SweetAlert2 çalışıyor!",
    icon: "success",
    confirmButtonText: "Tamam",
  });
}

export default showSuccessMessage;
