import numpy as np
import nltk
import pandas as pd
import sklearn

def train(csv_name):
    ds = pd.read_csv(csv_name)
    df = pd.DataFrame(ds,columns=['Head','Message','Type'])
    classes = df['Type']
    print("This",classes.value_counts())

    from sklearn.preprocessing import LabelEncoder
    encoder = LabelEncoder()
    Y = encoder.fit_transform(classes)

    messages = df["Message"]
    msg = messages.str.replace(r'[^a-zA-Z]',' ')
    msg = msg.str.replace(r'\s+',' ')
    msg = msg.str.rstrip()
    msg = msg.str.lstrip()
    msg = msg.str.lower()

    from nltk.corpus import stopwords
    nltk.download('stopwords')
    nltk.download('wordnet')
    nltk.download('punkt')
    stop_words = set(stopwords.words('english'))
    msg = msg.apply(lambda x: ' '.join(term for term in x.split() if term not in stop_words))

    from nltk.stem import WordNetLemmatizer
    lmt = WordNetLemmatizer()
    msg = msg.apply(lambda x: ' '.join(lmt.lemmatize(term) for term in x.split()))

    from nltk.tokenize import word_tokenize
    all_words = []

    for any in msg:
        words = word_tokenize(any)
        for w in words:
            all_words.append(w)

    all_words = nltk.FreqDist(all_words)
    l=len(all_words)
    word_features = list(all_words.keys())[:l]

    def find_features(message,word_features):
        words = word_tokenize(message)
        features = {}
        for word in word_features:
            features[word] = (word in words)
        return features

    from sklearn.feature_extraction.text import CountVectorizer
    cv = CountVectorizer(max_features = 1700)
    x = cv.fit_transform(msg).toarray()

    from sklearn import model_selection
    x_train,x_test,y_train,y_test = model_selection.train_test_split(x,Y, test_size = 0.25, random_state=1)

    return x_train,x_test,y_train,y_test,msg

    

def fakepredict(message):

    x_train,x_test,y_train,y_test,msg= train("covid.csv")
    from nltk.classify.scikitlearn import SklearnClassifier
    from sklearn.neighbors import KNeighborsClassifier
    from sklearn.tree import DecisionTreeClassifier
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.linear_model import LogisticRegression, SGDClassifier
    from sklearn.naive_bayes import MultinomialNB
    from sklearn.svm import SVC
    from sklearn.metrics import classification_report, accuracy_score, confusion_matrix

    names = ["K Nearest Neighbors", "Decision Tree", "Random Forest", "Logistic Regression", "SGD Classifier",
             "Naive Bayes", "SVM Linear"]

    classifiers = [
        KNeighborsClassifier(),
        DecisionTreeClassifier(),
        RandomForestClassifier(),
        LogisticRegression(),
        SGDClassifier(max_iter = 100),
        MultinomialNB(),
        SVC(kernel = 'linear')
    ]

    models = zip(names, classifiers)
    for name, model in models:
        model.fit(x_train,y_train)
        pred = model.predict(x_test)
        from sklearn.metrics import confusion_matrix
        from sklearn import metrics
        cm = confusion_matrix(y_test, pred)
       # print(name+" Accuracy:",metrics.accuracy_score(y_test,pred)*100)
        #print("Confusion matrix:\n",cm)

    model = MultinomialNB()
    model.fit(x_train,y_train)
    pred = model.predict(x_test)
    from sklearn.metrics import confusion_matrix
    from sklearn import metrics
    cm = confusion_matrix(y_test, pred)
    #print(" Accuracy:",metrics.accuracy_score(y_test,pred)*100)
    #print(cm)
    text = message
    corpus = []
    inp = text.replace(r'[^a-zA-Z]',' ')
    inp = inp.replace(r'\s+',' ')
    inp = inp.rstrip()
    inp = inp.lstrip()
    inp = inp.lower()
    inp = inp.split()
    # print(inp)
    from nltk.stem import WordNetLemmatizer
    from nltk.corpus import stopwords
    stop_words = set(stopwords.words('english'))
    lmt = WordNetLemmatizer()
    inp_feat = [lmt.lemmatize(word) for word in inp if not word in set(stopwords.words('english'))]
    inp_feat = ' '.join(inp_feat)
    corpus.append(inp_feat)
    #print(corpus)
    from sklearn.feature_extraction.text import CountVectorizer
    cv2 = CountVectorizer(max_features = 1700)
    X2 = cv2.fit_transform(msg + corpus).toarray()
    m = X2[-1].reshape(1, -1)
    result = model.predict(m)
    if result == 1:
        answer = "Genuine"
    else:
        answer = "Fake"
    print("TEXT INPUT:",text)
    print()
    print("ANS:",answer)
    if len(message)>1:
        return answer
    else:
        return ""