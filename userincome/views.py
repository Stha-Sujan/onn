from datetime import datetime
import json
from django.http import JsonResponse
from django.shortcuts import render, redirect

from core.models import UserPreference
from .models import Source, UserIncome
from django.core.paginator import Paginator
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.decorators import login_required
from django.contrib import messages
# Create your views here.

def search_income(request):
    if request.method == 'POST':
        search_str = json.loads(request.body).get('searchText')
        incomes = UserIncome.objects.filter(
            amount__istartswith=search_str, owner=request.user) | UserIncome.objects.filter(
            date__istartswith=search_str, owner=request.user) |  UserIncome.objects.filter(
            description__icontains=search_str, owner=request.user)| UserIncome.objects.filter(
            source__icontains=search_str, owner=request.user)
        
        data = incomes.values()
        return JsonResponse(list(data),safe=False)
        
@login_required(login_url='/authentication/login')
def index(request):
    sources = Source.objects.all()
    income=UserIncome.objects.filter(owner=request.user)
    paginator = Paginator(income,5)
    page_number = request.GET.get('page')
    page_obj = Paginator.get_page(paginator,page_number)
    try:
        currency = UserPreference.objects.get(user=request.user).currency
    except ObjectDoesNotExist:
        currency = None
    context = {
        'income': income,
        'page_obj': page_obj,
        'currency': currency
    }

    return render(request,'income/index.html', context)

@login_required(login_url='/authentication/login')
def add_income(request):
    sources = Source.objects.all()
    context = {
        'sources': sources,
        'values': request.POST
    }
    if request.method == 'GET':        
        return render(request,'income/add_income.html', context)

    if request.method == 'POST':
        amount = request.POST['amount']

        if not amount:
            messages.error(request,'Amount is required!')
            return render(request,'income/add_income.html', context)
        
        description = request.POST['description']
        date = request.POST['income_date']
        source = request.POST['source']

        if not description:
            messages.error(request,'Description is required!')
            return render(request,'income/add_income.html', context)
        
        UserIncome.objects.create(owner=request.user,amount=amount, date=date, source=source, description=description)
        messages.success(request,'Record saved successfully!')
        
        return redirect('income')
    
@login_required(login_url='/authentication/login')
def income_edit(request, id):
    income = UserIncome.objects.get(pk=id)
    sources = Source.objects.all()
    context = {
        'income': income,
        'values': income,
        'sources': sources
    }
    if request.method=='GET':
        return render(request,'income/edit_income.html', context)
    
    if request.method=='POST':
        amount = request.POST['amount']

        if not amount:
            messages.error(request,'Amount is required!')
            return render(request,'income/edit_income.html', context)
        
        description = request.POST['description']
        date = request.POST['income_date']
        source = request.POST['source']

        if not description:
            messages.error(request,'Description is required!')
            return render(request,'income/edit_income.html.html', context)
        
        income.amount=amount
        income.date=date
        income.source=source
        income.description=description
        
        income.save()
        messages.success(request,'Income updated successfully!')
        
        return redirect('income')
    
def delete_income(request,id):
    income = UserIncome.objects.get(pk=id)
    income.delete()

    messages.success(request,'Income deleted!')
    return redirect('income')        


