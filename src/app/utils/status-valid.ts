const timeoutText = '登录过期，请重新登录';
/**
 * 
 * @param {*} that 
 * @param {*} code 
 * @param {*} message 
 */
export const statusValid = (that, code, message) => {
  if (code === -403) {
    that.messageService.add({ severity: 'warning', summary: '提示', detail: timeoutText });
    setTimeout(() => {
      that.router.navigateByUrl('/page/login');
    }, 1000);
    return false
  }
  if (code === -404) {
    that.messageService.add({ severity: 'error', summary: '提示', detail: '服务器出错' });
    return false
  }
  if (code === 0) {
    if (message === '登录过期') {
      that.messageService.add({ severity: 'warning', summary: '提示', detail: timeoutText });
      setTimeout(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("noteToken");
        that.router.navigateByUrl('/page/login');
      }, 1000);
      return false
    } else {
      that.messageService.add({ severity: 'warning', summary: '提示', detail: message });
    }
    return false
  }
  return true
}