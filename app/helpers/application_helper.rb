module ApplicationHelper
  def auth_input
    string = "<input type='hidden' name='authenticity_token'"
    string += " value=\"#{h(form_authenticity_token)}\">"
    string.html_safe
  end
end
