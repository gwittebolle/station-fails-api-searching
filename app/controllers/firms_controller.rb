class FirmsController < ApplicationController
  before_action :set_firm, only: [:show]

  def index
    @firms = Firm.all
    @firm = Firm.new # Add this line to instantiate the form on the index
  end

  def create
    @firm = Firm.new(firm_params)

    respond_to do |format|
      if @firm.save
        format.html { redirect_to firm_path(@firm) }
        format.json # Follows the classic Rails flow and look for a create.json view
      else
        format.html { render "firms/new", status: :unprocessable_entity }
        format.json # Follows the classic Rails flow and look for a create.json view
      end
    end
  end

  def show
  end

  private

  def set_firm
    @firm = Firm.find(params[:id])
  end

  def firm_params
    params.require(:firm).permit(:name, :founders)
  end

end
