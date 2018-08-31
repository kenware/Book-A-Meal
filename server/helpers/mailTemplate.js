
export default class mailTemplate {
  menuMailoutput(host, username) {
    return `<html>\n\
   <body>\n\
   <table>\n\
   <tr>\n\
   <td>Title: </td><h2> Book-A-Meal</h2><td></td>\n\
   <td>Title: </td><h3> no-reply@Book-A-Meal.com </h3> <td></td>\n\
   </tr>\n\
   <tr>\n\
   <td>Email: </td>Today's Menu is set <td></td>\n\
   </tr>\n\
   <tr>\n\
   <td>MN: </td>Order Now<td></td>\n\
   </tr>\n\
   <tr>\n\
   <td>Messge: </td>This menu is specially prepared by well known caterer ${username} ,
   place your order<a href="${host}/dashboard"> here </a>. 
   If the above link do not 
   work. Please follow this link ${host}/dashboard <td></td>\n\
   </tr>\n\
   </table></body></html>`;
  }

  resetMailOutput(host, email, name, token) {
    return `<html>\n\
   <body>\n\
   <table>\n\
   <tr>\n\
   <td>Title: </td><h2> Book-A-Meal</h2><td></td>\n\
   <td>Title: </td>Reset Password <td></td>\n\
   </tr>\n\
   <tr>\n\
   <td>Email: </td><td>${email}</td>\n\
   </tr>\n\
   <tr>\n\
   <td>MN: </td> Click the link bellow to reset your password<td></td>\n\
   </tr>\n\
   <tr>\n\
   <td>Messge: </td> Dere ${name} reset your password 
   <a href='${host}/passwordreset/${token}'> here </a>. If the above link do not 
   work. Please follow this link ${host}/passwordreset/${token} <td></td>\n\
   </tr>\n\
   </table></body></html>`;
  }
}
