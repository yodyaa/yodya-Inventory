// Authentication Guard
// ไฟล์นี้จะตรวจสอบว่าผู้ใช้ล็อกอินแล้วหรือไม่
// ใส่ไฟล์นี้ในทุกหน้าที่ต้องการป้องกัน (ยกเว้นหน้า Login และ Register)

(function() {
  const auth = firebase.auth();
  const protectedPages = [
    'Dashboard.html',
    'Devices-admin.html', 
    'Devices.html',
    'Inv.html',
    'products.html',
    'Report-show.html',
    'Report.html',
    'Setting.html',
    'shop.html',
    'Team.html',
    'transactions.html',
    'User.html'
  ];

  // ตรวจสอบว่าหน้าปัจจุบันอยู่ในรายการที่ต้องป้องกันหรือไม่
  const currentPage = window.location.pathname.split('/').pop();
  
  if (protectedPages.includes(currentPage)) {
    // รอ DOM พร้อมก่อนซ่อน body
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        document.body.style.display = 'none';
      });
    } else {
      document.body.style.display = 'none';
    }
    
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        // ไม่มีการล็อกอิน ไปหน้า Login
        window.location.href = 'Login.html';
        return;
      }

      try {
        // ตรวจสอบข้อมูลพนักงานในฐานข้อมูล
        const empSnap = await db.ref('employees')
          .orderByChild('email')
          .equalTo(user.email)
          .once('value');

        if (!empSnap.exists()) {
          // ไม่พบข้อมูลพนักงาน
          alert('ไม่พบข้อมูลพนักงาน กรุณาติดต่อผู้ดูแลระบบ');
          await auth.signOut();
          window.location.href = 'Login.html';
          return;
        }

        // มีข้อมูลพนักงาน - บันทึก role ไว้ใน sessionStorage
        let userRole = 'User';
        empSnap.forEach(child => {
          const emp = child.val();
          userRole = emp.role || 'User';
          sessionStorage.setItem('userRole', userRole);
          sessionStorage.setItem('userName', emp.fullName || '');
          sessionStorage.setItem('userEmpId', emp.empId || '');
          console.log('[auth-guard] Set sessionStorage.userName =', emp.fullName || '');
        });

        // แสดงหน้าเว็บ (หลังเซ็ต sessionStorage)
        setTimeout(() => {
          document.body.style.display = '';
        }, 50); // รอ sessionStorage เขียนเสร็จ

      } catch (error) {
        console.error('Auth check error:', error);
        alert('เกิดข้อผิดพลาดในการตรวจสอบสิทธิ์');
        window.location.href = 'Login.html';
      }
    });
  }
})();

// ฟังก์ชันสำหรับ logout
function logout() {
  if (confirm('คุณต้องการออกจากระบบหรือไม่?')) {
    firebase.auth().signOut().then(() => {
      sessionStorage.clear();
      localStorage.removeItem('rememberedEmail');
      window.location.href = 'Login.html';
    }).catch((error) => {
      console.error('Logout error:', error);
      alert('เกิดข้อผิดพลาดในการออกจากระบบ');
    });
  }
}

// ฟังก์ชันตรวจสอบ role
function checkRole(requiredRole) {
  const userRole = sessionStorage.getItem('userRole');
  return userRole === requiredRole || userRole === 'Admin';
}

// ฟังก์ชันซ่อนเมนูตาม role
function setupRoleBasedUI() {
  const userRole = sessionStorage.getItem('userRole') || 'User';
  
  // ตัวอย่าง: ซ่อนเมนูบางอย่างสำหรับ User ทั่วไป
  if (userRole === 'User') {
    const adminOnlyElements = document.querySelectorAll('.admin-only');
    adminOnlyElements.forEach(el => el.style.display = 'none');
  }
}
