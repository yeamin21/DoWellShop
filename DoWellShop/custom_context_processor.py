from products.models import Category, Manufacturer


def req(request):
    print(request)
    return {'req':'x'}

def categories(request):
    return { 'categories':Category.objects.all()}
    
def manufacturers(request):
    return {'manufacturers':Manufacturer.objects.all()}
