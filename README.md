# DoWellShop
![product page](https://ibb.co/JFm9xc7)
### Step 1: install git and then clone the repository

run in terminal -> ```git clone https://github.com/yeamin21/DoWellShop-1.git``` or directly download the project as zip
and extract

### Step 2: install [ python ](https://www.python.org/downloads/) and [pip](https://pip.pypa.io/en/stable/installing/)

### Step 3: go to the project folder, open terminal and type -> ```pip install -r requirements.txt```

### Step 4: Run migration commands one by 1:

``` python manage.py makemigrations```
``` python manage.py migrate ```

### Step 5: Create superuser:

run ```python manange.py createsuperuser``` and provide user info

### Step 6:

run ``` python manage.py runserver``` and go to http://127.0.0.1:8000/admin and create some products

