const timeoutText = '登录过期，请重新登录';
const lifeTime = 2000;   //弹窗隐藏时间
/**
 * 
 * @param {*} that 
 * @param {*} code 
 * @param {*} message 
 */
export const statusValid = (that, code, message) => {
  if (code === -403) {
    that.messageService.add({ severity: 'warn', summary: '提示', detail: timeoutText,life:lifeTime });
    setTimeout(() => {
      that.router.navigateByUrl('/page/login');
    }, 2000);
    return false
  }
  if (code === -404) {
    that.messageService.add({ severity: 'error', summary: '提示', detail: '服务器出错',life:lifeTime });
    return false
  }
  if (code === 0) {
    if (message === '登录过期') {
      that.messageService.add({ severity: 'warn', summary: '提示', detail: timeoutText,life:lifeTime });
      setTimeout(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("noteToken");
        that.router.navigateByUrl('/page/login');
      }, 2000);
      return false
    } else {
      that.messageService.add({ severity: 'warn', summary: '提示', detail: message,life:lifeTime });
    }
    return false
  }
  return true
}