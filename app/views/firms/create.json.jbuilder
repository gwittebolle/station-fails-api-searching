# app/views/firms/create.json.jbuilder
if @firm.persisted?
  json.form render(partial: "firms/form", formats: :html, locals: {firm: Firm.new})
  json.inserted_item render(partial: "firms/firm", formats: :html, locals: {firm: @firm})
else
  json.form render(partial: "firms/form", formats: :html, locals: {firm: @firm})
end
