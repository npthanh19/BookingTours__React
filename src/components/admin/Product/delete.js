import { getDatabase, ref, remove } from 'firebase/database';
import Swal from 'sweetalert2';
import { app } from '../../../firebase/firebase';

const deleteProduct = async (id, setproducts, products) => {
  Swal.fire({
    title: 'Bạn chắc chắn muốn xoá?',
    text: "Nếu xoá sẽ mất đi dữ liệu!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Đồng ý',
    cancelButtonText: 'Huỷ'
  }).then(async (result) => {
    if (result.isConfirmed) {
      const db = getDatabase(app);
      const productRef = ref(db, `products/${id}`);
      try {
        await remove(productRef);
        setproducts(products.filter(product => product.id !== id));
        Swal.fire(
          'Xoá!',
          'Đã xoá thành công!',
          'success'
        );
      } catch (error) {
        console.error('Error deleting data:', error);
        Swal.fire(
          'Error!',
          'Không thể xoá danh mục!',
          'error'
        );
      }
    }
  });
};

export default deleteProduct;